<template>
    <div :id="id" />
</template>
<script>

export default {
    props: {
        projectId: {
            type: String,
            required: true
        },
        embedOptions: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        id() {
            return JSON.stringify({ projectId: this.projectId, embedOptions: this.embedOptions });
        }
    },
    mounted() {
        StackBlitzSDK.embedProjectId(this.id, this.projectId, this.embedOptions);
    }
}
</script>