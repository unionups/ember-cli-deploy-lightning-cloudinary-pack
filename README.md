# ember-cli-deploy-lightning-cloudinary-pack

> AAn ember-cli-deploy plugin pack to implement a 'lightning' deployment pattern ( with [Cloudinary CDN](https://cloudinary.com/) )

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-lightning-pack.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

This package bundles the plugins you need to have a deployment pipeline for your Ember app similar to what I described in my talk: Lightning Fast Deployment of Your Rails-backed JavaScript https://www.youtube.com/watch?v=QZVYP3cPcWQ

### It also has a blueprint for your `config/deploy.js` file to get you started ( `ember g lightning-deploy-config` for manual run ).

## Installation

```
ember install ember-cli-deploy
ember install ember-cli-deploy-lightning-cloudinary-pack
```

The necessary set of plugins will be available to ember-cli-deploy and an example `config/deploy.js` file will be generated for you to customize with information for your deployment environments.

## What is a plugin pack?

A "plugin pack" is a concept supported by ember-cli-deploy that allows a single addon to make multiple plugins available by adding a single direct dependency to your project.

## What plugins are made available?

* [ember-cli-deploy-build](https://github.com/ember-cli-deploy/ember-cli-deploy-build)
* [ember-cli-deploy-display-revisions](https://github.com/ember-cli-deploy/ember-cli-deploy-display-revisions)
* [ember-cli-deploy-redis](https://github.com/ember-cli-deploy/ember-cli-deploy-redis)
* [ember-cli-deploy-cloudinary](https://github.com/unionups/ember-cli-deploy-cloudinary)
* [ember-cli-deploy-manifest](https://github.com/ember-cli-deploy/ember-cli-deploy-manifest)
* [ember-cli-deploy-revision-data](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data)

