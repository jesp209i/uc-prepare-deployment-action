const core = require('@actions/core');
const http = require('@actions/http-client');

async function run() {
    try {
        const projectAlias = core.getInput('project-alias');
        const apiKey = core.getInput('api-key');
        const commitMessage = core.getInput('commit-message');

        const url = `https://api-internal.umbraco.io/projects/${projectAlias}/deployments/`

        const requestBody = {
            "commitMessage": commitMessage
        };

        const headers = {
            [http.Headers.ContentType]: http.MediaTypes.ApplicationJson,
            "Umbraco-Api-Key": apiKey
        };

        const client = new http.HttpClient();

        const response = await client.post(url, requestBody, headers);
        const responseBody = await res.readBody()
        const obj = JSON.parse(responseBody)

        obj.deploymentId
        core.setOutput('DEPLOYMENT_ID', obj.deploymentId);

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();