<script lang="ts">
    import {createEventDispatcher} from "svelte";

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
</script>

<div class="overflow-x-auto">
    <table class="table border-separate border-spacing-y-1">
        <thead>
        <tr>
            {#each headers as header}
                <th>{header}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each items as item}
            <tr class={formatExpiryColor(item)} on:click={() => handleClick(item)}>
                {#each Object.entries(item) as [key, value]}
                    {#if key !== 'id'}
                        <td class="p-5">{format(value)}</td>
                    {/if}
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
</div>
