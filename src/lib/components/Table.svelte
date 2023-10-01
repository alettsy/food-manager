<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let type: string;
    export let headers: string[];
    export let items: object[];

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
</script>

<div class="overflow-x-auto">
    <table class="table border-separate border-spacing-y-1">
        <thead>
        <tr>
            {#each headers as header}
                <th>{header}</th>
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
