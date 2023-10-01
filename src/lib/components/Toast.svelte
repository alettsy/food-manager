<script lang="ts">
    export let color: string;
    export let text: string;
    export let showToast: boolean;
    export let time: number;

    $: if (showToast) showForTime();

    function showForTime() {
        if (showToast) return;

        setInterval(() => {
            showToast = false;
        }, time);
    }
</script>

{#if showToast}
    <div class="toast toast-center">
        {#if color === 'success'}
            <div class="alert alert-success">
                <span>{text}</span>
            </div>
        {:else if color === 'error'}
            <div class="alert alert-error">
                <span>{text}</span>
            </div>
        {:else if color === 'info'}
            <div class="alert alert-info">
                <span>{text}</span>
            </div>
        {/if}
    </div>
{/if}
