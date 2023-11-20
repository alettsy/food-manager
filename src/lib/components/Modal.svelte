<script lang="ts">
    import Filter from "$lib/components/Filter.svelte";
    import {createEventDispatcher} from "svelte";
    import toaster from '../toaster';
    import {formatDate} from "$lib/utils";

    export let id: number | null;
    export let action: string;
    export let type: string;
    export let showModal: boolean;

    let dialog: any;
    let items: any;
    let requesting = false;
    $: if (dialog && showModal) items = update();

    async function update() {
        let path = '/api/' + type + '/layout/' + action + (id === null ? '' : '/' + id);
        dialog.showModal()
        const r = await fetch(path);
        const x = await r.json();
        console.log(x);
        return x;
    }

    function dropdownChanged(payload: any, child: any) {
        child.value = payload.detail.newValue;
    }

    function textChanged(event: any, child: any) {
        child.value = event.target.value;
    }

    function dateChanged(event: any, child: any) {
        child.value = event.target.value;
    }

    const dispatch = createEventDispatcher();

    async function submit() {
        // TODO: validate number input + toasts instead of alerts + date selector + number restriction
        const r = await items;
        const name = r.children.find((v: any) => v.type === 'name');

        if (name.value === '') {
            toaster.error('Name is required');
        } else {
            requesting = true;
            let payload: any = {};
            for (let child of r.children) {
                payload[child.type] = child.value;
            }

            const response = await fetch('/api/' + type + '/' + action, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            const j = response.json();
            let text = action === 'new' ? ' was added' : ' was updated';
            toaster.success(type + text);
            requesting = false;
            dispatch('close');
            dialog.close();
        }
    }
</script>

<dialog bind:this={dialog} class="modal" id="my_modal" on:close={() => showModal = false}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {#if showModal}
            {#await items}
                <p>Loading...</p>
            {:then json}
                <h2 class="font-bold text-lg">{json.title}</h2>
                <div class="flex flex-col space-y-1">
                    {#each json.children as child}
                        {#if child.type !== 'id'}
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">{child.title}</span>
                                </label>
                                {#if child.valueType === 'dropdown'}
                                    <Filter name={child.title} route={child.route} selected={child.value}
                                            on:change={(e) => dropdownChanged(e, child)}/>
                                    {:else if child.valueType === 'date'}
                                    <input on:change={(e) => dateChanged(e, child)} value={child.value} type="date" min={formatDate(new Date(), 1)} class="input input-bordered input-primary max-w-xs" pattern="\d{4}-\d{2}-\d{2}" />
                                {:else}
                                    <input type="text"
                                           class={"input input-bordered input-primary max-w-xs " + child.css}
                                           placeholder="" value={child.value} on:input={(e) => textChanged(e, child)}/>
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>
                <div class="flex justify-end">
                    {#if requesting}
                        <button class="btn btn-primary">
                            <span class="loading loading-spinner"></span>
                        </button>
                    {:else}
                        <button class="btn btn-primary" on:click={submit}>Submit</button>
                    {/if}
                </div>
            {:catch _}
                <p>Error</p>
            {/await}
        {/if}
    </div>
</dialog>
