<script lang="ts">
    export let id: number | null;
    export let action: string;
    export let type: string;
    export let showModal: boolean;

    let dialog: any;
    $: if(dialog && showModal) update();

    function update() {
        // TODO: re-fetch layout and display
        let path = '/api/v1/'+type+'/'+action+ (id === null ? '' : '/'+id);
        console.log(path);
        dialog.showModal()
    }
</script>

<dialog id="my_modal" class="modal" bind:this={dialog} on:close={() => showModal = false}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">{'DEV'}</h3>
        <div class="flex flex-col">
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p style="margin-left: auto">Test</p>
        </div>
    </div>
</dialog>
