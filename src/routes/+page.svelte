<script lang="ts">
    import ControlBar from "$lib/components/ControlBar.svelte";
    import Table from "$lib/components/Table.svelte";
    import {filters} from "$lib/store";
    import {onMount} from "svelte";
    import ActionButton from "$lib/components/ActionButton.svelte";
    import Modal from "$lib/components/Modal.svelte";

    export let data;

    let filterOptions = {
        sort: {
            property: 'name',
            order: 'asc'
        },
        search: '',
        filters: {
            expiry: undefined,
            location: undefined,
            category: undefined
        }
    }

    $: filterStore = $filters;
    let items: any = [];

    onMount(() => {
        const interval = setInterval(getItems, 3000);
        getItems();

        const unsub = filters.subscribe((v: any) => {
            getItems();
        });

        return () => {
            clearInterval(interval);
            unsub();
        }
    })

    async function getItems() {
        filterOptions.filters = filterStore;

        const r = await fetch('/api/item/filter', {
            method: 'POST',
            body: JSON.stringify(filterOptions)
        })
        const json = await r.json();
        if (json !== items) items = json;
    }

    let content = {};

    function actionChosen(action: any) {
        // TODO: add action (prefix) depending on edit/new
        let index: string = action.detail.data;
        if (data.layouts[index] === undefined) return;
        content = data.layouts[index];
        document.getElementById('my_modal')?.showModal();
    }
</script>

<div class="main mx-5">
    <Modal {content} />
    <ActionButton options={data.actions} on:action={actionChosen} />
    <ControlBar controls={data.controls}/>
    {#await items}
        <p>Loading</p>
    {:then json}
        {#if json.length === 0}
            <p>No items</p>
        {:else}
            <Table headers={data.headers} items={json}/>
        {/if}
    {/await}
</div>

<style>
    .main {
        visibility: hidden;
    }

    @media only screen and (min-width: 480px) {
        .main {
            visibility: visible;
        }
    }
</style>
