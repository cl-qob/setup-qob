[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/release/cl-qob/setup-qob.svg?logo=github)](https://github.com/cl-qob/setup-qob/releases/latest)

# setup-qob
> Install Qob for GitHub Actions workflow

## 🔨 Usage

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    ...

    # Install SBCL
    - name: Setup SBCL
      uses: cheeze2000/setup-sbcl@main
      with:
        version: 2.4.2

    # Install Qob
    - uses: cl-qob/setup-qob@master
      with:
        version: 'snapshot'

    ...
```

This example is testing your package in below environment.

* SBCL: `2.4.2`
* Qob: `snapshot` (latest)

### Inputs

| name         | value  | default  | description                                                                                  |
|:-------------|:-------|:---------|:---------------------------------------------------------------------------------------------|
| version      | string | snapshot | The version of Qob to install, e.g. "0.0.8", or "snapshot" for a recent development version. |
| architecture | string | x64      | The target architecture (x64, arm64) of the Qob-CLI.                                         |

## ⚜️ License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

See [`LICENSE`](./LICENSE) for details.
