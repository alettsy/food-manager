<script lang="ts">
    import Filter from "$lib/components/Filter.svelte";

    export let id: number | null;
    export let action: string;
    export let type: string;
    export let showModal: boolean;

    let dialog: any;
    let items: any;
    $: if (dialog && showModal) items = update();

    async function update() {
        console.log('update');
        // TODO: re-fetch layout and display
        let path = '/api/' + type + '/layout/' + action + (id === null ? '' : '/' + id);
        dialog.showModal()
        const r = await fetch(path);
        return r.json();
    }

    function dropdownChanged(payload: any, child: any) {
        child.value = payload.detail.newValue;
    }

    function textChanged(event: any, child: any) {
        child.value = event.target.value;
    }

    function submit() {
        console.log('Submit pressed');
        console.log(items)
        // TODO: validate
        // TODO: submit with action + update button to indicator and show toast on complete
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
                            <div>
                                <h3>{child.title}</h3>
                                {#if child.valueType === 'dropdown'}
                                    <Filter name={child.title} route={child.route} selected={child.value}
                                            on:change={(e) => dropdownChanged(e, child)}/>
                                {:else}
                                    <input type="text"
                                           class={"input input-bordered input-primary max-w-xs " + child.css}
                                           placeholder="" on:input={(e) => textChanged(e, child)}/>
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>
                <div class="flex justify-end">
                    <button class="btn btn-primary ml-auto" on:click={submit}>Submit</button>
                </div>
            {:catch e}
                <p>Error</p>
            {/await}
        {/if}
    </div>
</dialog>
