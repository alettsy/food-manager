<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let type: string;
    export let headers: string[];
    export let items: object[];
    export let sortBy: string;
    export let order: string;

    function format(data: any): any {
        if (data === null) return 'None';
        return typeof (data) === 'object' ? data.name : data;
    }

    function formatExpiryColor(data: any): string {
        if (data.expiry === null) return "after:bg-neutral";

        if (new Date(data.expiry) < new Date()) {
            return "after:bg-error"
        }

        let week = new Date();
        week.setDate(week.getDate() + 7);
        if (new Date(data.expiry) < week) {
            return "after:bg-accent"
        }

        let month = new Date();
        month.setDate(month.getDate() + 30);
        if (new Date(data.expiry) < month) {
            return "after:bg-secondary"
        }

        return "after:bg-neutral";
    }

    const dispatch = createEventDispatcher();

    function handleClick(item: any) {
        dispatch('itemClicked', {
            data: item
        })
    }

    function remove(item: any) {
        const text = "Delete " + item.name + "?";
        if (confirm(text)) {
            fetch('/api/' + type + '/delete', {
                method: 'POST',
                body: JSON.stringify({id: item.id})
            });
            alert('Deleted ' + item.name);
        }
    }

    function headerClicked(header: any) {
        if (sortBy === header.toLowerCase()) {
            order = order === 'asc' ? 'desc' : 'asc';
        } else {
            sortBy = header.toLowerCase();
            order = 'asc';
        }

        dispatch('orderChanged', {
            data: {
                sortBy: sortBy,
                order: order
            }
        });
    }
</script>

<div class="overflow-x-auto">
    <table class="table border-separate border-spacing-y-1">
        <thead>
        <tr>
            {#each headers as header}
                <th on:click={() => headerClicked(header)}>
                    <div class="flex items-center">
                        {#if sortBy === header.toLowerCase()}
                            {#if order === 'desc'}
                                <svg fill="#ffffff" class="h-3 w-3 mr-1" version="1.1" id="Layer_1"
                                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                     viewBox="0 0 386.257 386.257" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> <polygon
                                            points="0,96.879 193.129,289.379 386.257,96.879 "></polygon> </g></svg>
                            {:else}
                                <svg fill="#ffffff" class="h-3 w-3 mr-1" version="1.1" id="Layer_1"
                                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                     viewBox="0 0 386.257 386.257" xml:space="preserve"
                                     transform="matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> <polygon
                                            points="0,96.879 193.129,289.379 386.257,96.879 "></polygon> </g></svg>
                            {/if}
                        {/if}
                        <div>{header}</div>
                    </div>
                </th>
            {/each}
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each items as item}
            <tr class={formatExpiryColor(item)}>
                {#each Object.entries(item) as [key, value]}
                    {#if key !== 'id'}
                        <td class="p-5" on:click={() => handleClick(item)}>{format(value)}</td>
                    {/if}
                {/each}
                <td class="pl-0 pr-0">
                    <label>
                        <button class="btn btn-circle text-primary bg-neutral border-none"
                                on:click={() => remove(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </label>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
