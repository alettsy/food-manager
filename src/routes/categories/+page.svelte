<script lang='ts'>
    import Table from '$lib/components/Table.svelte';
    import { onMount } from 'svelte';
    import ActionButton from '$lib/components/ActionButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import ControlBar from "$lib/components/ControlBar.svelte";
    import Confirm from "$lib/components/Confirm.svelte";

    export let data;

    let items: any = new Promise((r: any, _) => setTimeout(r([]), 5000));

    let showConfirm = false;
    let confirmSettings = {
        message: '',
        successMessage: '',
        actionFunction: () => {}
    };

    onMount(() => {
        const interval = setInterval(getItems, 3000);
        getItems();

        return () => {
            clearInterval(interval);
        };
    });

    async function getItems() {
        const r = await fetch('/api/category/all');
        const json = await r.json();
        if (json !== items) items = json;
    }

    let action = 'new';
    let id: number | null = null;
    let type = 'category';
    let showModal = false;

    function newAction(a: any) {
        action = 'new';
        id = null;
        type = a.detail.data;
        showModal = true;
    }

    function editItem(a: any) {
        action = 'edit';
        id = a.detail.data.id;
        type = 'category';
        showModal = true;
    }

    function refresh() {
        getItems();
    }

    function remove(payload: any) {
        const item = payload.detail.item;

        confirmSettings = {
            message: 'Delete ' + item.name + '?',
            successMessage: 'Deleted ' + item.name,
            actionFunction: async () => {
                return await fetch('/api/category/delete', {
                    method: 'POST',
                    body: JSON.stringify({id: item.id})
                });
            }
        };

        showConfirm = true;
    }
</script>

<div class='main mx-5 text-center'>
    <Confirm bind:showModal={showConfirm} actionFunction={confirmSettings.actionFunction}
             successMessage={confirmSettings.successMessage} message={confirmSettings.message} />
    <Modal {action} bind:showModal {id} {type} on:close={refresh} />
    <ActionButton on:action={newAction} options={data.actions} />
    <ControlBar controls={data.controls} />
    {#await items}
        <span class='loading loading-spinner loading-lg text-primary'></span>
    {:then json}
        {#if json.length === 0}
            <p>No items</p>
        {:else}
            <Table sortBy={'name'} order={'asc'} type='category'
                   headers={data.headers} items={json} on:itemClicked={editItem} on:refresh={refresh} on:delete={remove} />
        {/if}
    {/await}
</div>

<style>
    .main {
        visibility: hidden;
        height: 100%;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        margin-top: 0.25rem;
    }

    @media only screen and (min-width: 480px) {
        .main {
            visibility: visible;
            margin-left: 1.25rem;
            margin-right: 1.25rem;
            margin-top: 1.25rem;
        }
    }
</style>
