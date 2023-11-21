<script lang="ts">
    import toaster from "$lib/toaster";

    export let showModal: boolean;
    export let successMessage: string;
    export let message: string;
    export let actionFunction: Function;

    let dialog: any;
    let requesting = false;

    $: if (dialog && showModal) dialog.showModal();

    async function submit() {
        requesting = true;

        const response = await actionFunction();

        if (response.ok) {
            toaster.success(successMessage);
        } else {
            const json: any = await response.json();
            toaster.error(json.message);
        }

        requesting = false;
        showModal = false;
        dialog.close();
    }

    function cancel() {
        requesting = false;
        showModal = false;
        dialog.close();
    }
</script>

<dialog bind:this={dialog} class="modal" id="confirmModal" on:close={() => showModal = false}>
    <div class="confirm-modal modal-box w-[20%] max-w-none">
        <h1 class="font-bold text-2xl text-primary">Confirm</h1>
        <p class="text-lg">{message}</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary">✕</button>
            </form>
            <div class="flex justify-end space-x-2">
                {#if requesting}
                    <button class="btn btn-primary">
                        <span class="loading loading-spinner"></span>
                    </button>
                {:else}
                    <button class="btn btn-error px-5" on:click={cancel}>No</button>
                    <button class="btn btn-primary px-5" on:click={submit}>Yes</button>
                {/if}
            </div>
        </div>
    </div>
</dialog>

<style>
    .confirm-modal {
        max-width: 500px;
        width: 50%;
    }

    @media only screen and (min-width: 798px) and (max-width: 1024px) {
        .confirm-modal {
            width: 40%;
        }
    }

    @media only screen and (min-width: 1024px) {
        .confirm-modal {
            width: 30%;
        }
    }
</style>
