import * as core from '@actions/core';
import * as exec from "@actions/exec";
import * as io from "@actions/io";
import * as tc from "@actions/tool-cache";
import * as os from 'os';
import fs from 'fs';
const https = require('https');

function getPlatform(): string {
    switch (process.platform) {
        case 'linux': return 'linux';
        case 'darwin': return 'macos';
        case 'win32': return 'win';
    }
    return 'linux';  /* Default: linux */
}

function getExt(): string {
    switch (process.platform) {
        case 'linux':
        case 'darwin': return 'tar.gz';
        case 'win32': return 'zip';
    }
    return 'tar.gz';  /* Default: linux */
}

async function run(): Promise<void> {
    try {
        const PATH = process.env.PATH;

        const home = os.homedir();
        const tmp = os.tmpdir();

        const version      = core.getInput("version");
        const architecture = core.getInput("architecture");
        const platform     = getPlatform();

        const ext           = getExt();
        const archiveSuffix = `${platform}-${architecture}.${ext}`;  // win-x64.zip
        const archiveName   = `qob_${version}_${archiveSuffix}`;     // qob_0.7.10_win-x64.zip

        core.startGroup("Fetch Qob");
        {
            let downloadUrl = `https://github.com/cl-qob/cli/releases/download/${version}/${archiveName}`;
            if (version == 'snapshot') {
                downloadUrl = `https://github.com/cl-qob/binaries/raw/master/${archiveSuffix}`;
            }

            await exec.exec('curl', [
                '-L',
                downloadUrl,
                '-o',
                `${tmp}/${archiveName}`
            ]);

            fs.mkdirSync(`${tmp}/qob-${version}`);
            /* Extraction */
            {
                if (platform === 'win')
                    await exec.exec('unzip', [`${tmp}/${archiveName}`, '-d', `${tmp}/qob-${version}`]);
                else
                    await exec.exec('tar', ['-xvzf', `${tmp}/${archiveName}`, '-C', `${tmp}/qob-${version}`]);
            }
            const options = { recursive: true, force: false };
            await io.mv(`${tmp}/qob-${version}`, `${home}/qob-${version}`, options);
            core.addPath(`${home}/qob-${version}`);
        }
        core.endGroup();

        // show Qob version
        await exec.exec('qob', ['--version']);
    } catch (error) {
        let errorMsg = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        core.setFailed(errorMsg);
    }
}

run();
