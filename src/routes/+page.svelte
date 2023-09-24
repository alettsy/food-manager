<script lang="ts">
    export let data;

    import ControlBar from "$lib/components/ControlBar.svelte";
    import Table from "$lib/components/Table.svelte";

    const filterOptions = {
        sort: {
            property: 'name',
            order: 'asc'
        },
        search: '',
        filters: {
            expiry: undefined
        }
    }

    async function getItems() {
        const r = await fetch('/api/item/filter', {
            method: 'POST',
            body: JSON.stringify(filterOptions)
        })
        return r.json();
    }
</script>

<div class="mx-5">
    <ControlBar controls={data.controls}/>
    {#await getItems()}
        <p>Loading</p>
    {:then json}
        <Table headers={data.headers} items={json}/>
    {/await}
</div>
