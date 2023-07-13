"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const http_client_1 = require("@actions/http-client");
async function run() {
    try {
        const projectAlias = (0, core_1.getInput)('project-alias');
        const apiKey = (0, core_1.getInput)('api-key');
        const commitMessage = (0, core_1.getInput)('commit-message');
        const url = `https://api-internal.umbraco.io/projects/${projectAlias}/deployments/`;
        const requestBody = {
            "commitMessage": commitMessage
        };
        const headers = {
            [http_client_1.Headers.ContentType]: http_client_1.MediaTypes.ApplicationJson,
            "Umbraco-Api-Key": apiKey
        };
        const client = new http_client_1.HttpClient();
        const response = await client.post(url, JSON.stringify(requestBody), headers);
        const responseBody = await response.readBody();
        const obj = JSON.parse(responseBody);
        (0, core_1.setOutput)('DEPLOYMENT_ID', obj.deploymentId);
    }
    catch (error) {
        console.log(error);
        (0, core_1.setFailed)("Got an error while trying to prepare a deployment");
    }
}
run();
