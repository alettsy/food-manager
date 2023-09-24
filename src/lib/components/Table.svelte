<script lang="ts">
    export let headers: string[];
    export let items: object[];

    $: allowed = headers.length === headers.length;

    function format(data: any): any {
        if (data === null) return 'None';
        return typeof (data) === 'object' ? data.name : data;
    }

    function formatExpiryColor(data: any): string {
        const defaultStyle = "table-row ";

        if (data.expiry === null) return defaultStyle + "after:bg-neutral";

        let week = new Date();
        week.setDate(week.getDate() + 7);
        if (new Date(data.expiry) < week) {
            return defaultStyle + "after:bg-accent"
        }

        let month = new Date();
        month.setDate(month.getDate() + 30);
        if (new Date(data.expiry) < month) {
            return defaultStyle + "after:bg-secondary"
        }

        if (new Date(data.expiry) < new Date()) {
            return defaultStyle + "after:bg-error"
        }

        return defaultStyle + "after:bg-neutral";
    }
</script>

{#if allowed}
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
            <tr>
                {#each headers as header}
                    <th>{header}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each items as item}
                <tr class={formatExpiryColor(item)}>
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
{/if}
