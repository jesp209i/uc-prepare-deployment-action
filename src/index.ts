import { getInput, setOutput, setFailed, info } from '@actions/core';
import { ApiClient } from '@jam-test-umbraco/umbraco-cloud-deployment-apiclient';
import { DeploymentResponse } from '@jam-test-umbraco/umbraco-cloud-deployment-apiclient/src/apiTypes';

async function run() {
    try {
        const apiBaseUrl = getInput('api-base-url', {required: true });
        const projectAlias = getInput('project-alias', { required: true});
        const apiKey = getInput('api-key', { required: true});
        const commitMessage = getInput('commit-message', { required: true});

        const apiClient = new ApiClient(apiBaseUrl, projectAlias, apiKey);

        const response = await apiClient.prepareDeployment(commitMessage);

        const deploymentResponse = response as DeploymentResponse;

        info('Requested Deployment from Umbraco Cloud.');
        info('----------------------------------------');
        info(`Deployment Id: ${deploymentResponse.deploymentId}`);

        setOutput('DEPLOYMENT_ID', deploymentResponse.deploymentId);

    } catch (error: unknown) {
        console.log(error);
        setFailed("Got an error while trying to prepare a deployment")
    }
}

run();