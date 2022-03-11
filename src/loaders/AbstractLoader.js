class AbstractLoader {
    dataset = '';
    table = '';
    schema = null;

    /**
     * Check that the dataset exists before using it.
     * @abstract
     */
    async datasetExists(){}

    /**
     * Check that the table exists before using it.
     * @abstract
     */
    async tableExists(){}

    /**
     * Load the data.
     * @abstract
     */
    async load( data ){}
}

module.exports = AbstractLoader;