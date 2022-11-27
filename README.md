# RevPress Plugin

## Building
Building the Javascript and CSS assets for RevPress must be completed before generating a distributable plugin. To build the assets for RevPress you will need to have Node.js installed.

1. Clone this repository:
```
git clone git@github.com:christopheran/revpress.git
```

2. Navigate to the cloned source and install the Javascript dependencies:
```
cd revpress
npm install
```

3. Build the assets:
```
npm run build
```

The assets will be stored in the _assets/_ directory.