import { getInput, setOutput, setFailed, info } from '@actions/core';
import {HttpClient, MediaTypes, Headers, HttpClientError} from '@actions/http-client';

async function run() {
    try {
        const projectAlias = getInput('project-alias');
        const apiKey = getInput('api-key');
        const commitMessage = getInput('commit-message');

        const url = `https://api-internal.umbraco.io/projects/${projectAlias}/deployments/`

        const requestBody = {
            "commitMessage": commitMessage
        };

        const headers = {
            [Headers.ContentType]: MediaTypes.ApplicationJson,
            "Umbraco-Api-Key": apiKey
        };

        const client = new HttpClient();

        const response = await client.post(url, JSON.stringify(requestBody), headers);
        const responseBody = await response.readBody()
        const obj = JSON.parse(responseBody)

        info('Requested Deployment from Umbraco CLoud.');
        info('----------------------------------------');
        info(`Deployment Id: ${obj.deploymentId}`);

        setOutput('DEPLOYMENT_ID', obj.deploymentId);

    } catch (error: unknown) {
        console.log(error);
        setFailed("Got an error while trying to prepare a deployment")
    }
}



run();