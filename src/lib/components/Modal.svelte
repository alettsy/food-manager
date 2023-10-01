<script lang="ts">
    export let content: object;
</script>

<dialog id="my_modal" class="modal">
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">{content.name ?? ''}</h3>
        <div class="flex flex-col">
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p style="margin-left: auto">Test</p>
        </div>
    </div>
</dialog>
