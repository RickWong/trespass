# trespass

Tired of `&&` or `?:` property guarding? Access undefined object properties and chain undefined methods in a safe manner.

## Installation

```bash
npm install --save trespass
```

## Usage

Simple:

```js
import t from 'trespass';

const fakeUser = undefined;
const realUser = { name: 'Rick' };

t(fakeUser).contact.$; // access undefined or null objects

t(realUser).contact.faxNumber.$; // access undefined properties

t(realUser).greet().fakeSlap().$; // chain defined and undefined methods

t(fakeUser).fakeSlap().greet().fakeName.$; // all together
```

Custom terminator:

```js
const $ = t.createWrapper('$val'); 

$(foo).bar.$val; 
```

## Requirements

Node 6.4+. Native [Browser support](https://caniuse.com/#search=Proxy) for ES6 Proxies.

## Why

Because the official Optional Chaining `?.` proposal is still in stage-1 currently, see https://github.com/tc39/proposal-optional-chaining.

## Other packages

- https://github.com/facebookincubator/idx
- https://github.com/ktsn/safe-object-proxy
- https://github.com/erictrinh/safe-proxy
- https://github.com/forceuser/access-deep
- https://github.com/tonylukasavage/safeproxy

## Community

Let's start one together! After you ★ this project, follow me [@rygu](https://twitter.com/rygu) on Twitter.

## License

BSD 3-Clause license. Copyright © 2017, Rick Wong. All rights reserved.
