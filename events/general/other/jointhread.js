module.exports = {
    name: `threadCreate`,
    execute(thread, newlyCreated) {
        if (newlyCreated) thread.join()
    }
}