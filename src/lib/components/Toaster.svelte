<script lang="ts">
    import { fade } from "svelte/transition";
    import {onDestroy} from "svelte";
    import {toast} from "$lib/toaster";

    let show: boolean;

    const unsubscribe = toast.subscribe((t: any) => {
        if (t.text !== undefined) {
            show = true;
            const duration = t.duration ?? 3000;
            setTimeout(() => toast.set({}), duration);
        } else {
            show = false;
        }
    });

    onDestroy(unsubscribe);
</script>

{#if show}
    <div class="toast toast-top toast-center z-[1000]" in:fade={{duration: 100}} out:fade>
        {#if $toast.type === 'success'}
            <div class="alert alert-success">
                <span>{$toast.text}</span>
            </div>
        {:else if $toast.type === 'error'}
            <div class="alert alert-error">
                <span>{$toast.text}</span>
            </div>
        {:else}
            <div class="alert alert-info">
                <span>{$toast.text}</span>
            </div>
        {/if}
    </div>
{/if}
