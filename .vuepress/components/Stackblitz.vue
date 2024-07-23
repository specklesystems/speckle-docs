<template>
    <div :id="id" />
</template>
<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        projectId: {
            type: String,
            required: true
        },
        embedOptions: {
            type: Object,
            default: () => ({})
        }
    },
    mounted() {
        StackBlitzSDK.embedProjectId(this.id, this.projectId, this.embedOptions);
    }
}
</script>