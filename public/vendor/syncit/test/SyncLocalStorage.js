(function (root, factory) {
	"use strict";
	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory(
			require('expect.js'),
			require('../FakeLocalStorage.js'),
			require('../SyncLocalStorage.js')
		);
	} else {
		// AMD. Register as an anonymous module.
		define(
			[
				'../FakeLocalStorage',
				'../SyncLocalStorage'
			],
			factory.bind(this, expect)
		);
	}
}(this, function (
	expect,
	FakeLocalStorage,
	SyncLocalStorage
) {


"use strict";

// Author: Matthew Forrester <matt_at_keyboardwritescode.com>
// Copyright: Matthew Forrester
// License: MIT/BSD-style

var getInstance = function() {
	return new SyncLocalStorage(
		new FakeLocalStorage(),
		'aa',
		JSON.stringify,
		JSON.parse
	);
};

(function() {
/* global describe: false, it: false */

describe('SyncLocalStorage might be useful if',function() {
	it('can do basic localstorage things',function() {
		var lls = getInstance();
		lls.setItem('hi.there.james',{hi:{there:"james"}});
		lls.setItem('hi.there.bob',{hi:{there:"bob"}});
		expect(lls.getItem('hi.there.bob')).to.eql({hi:{there:"bob"}});
		expect(lls.key(0)).to.equal('hi.there.bob');
		expect(lls.key(1)).to.equal('hi.there.james');
		expect(lls.getLength()).to.equal(2);
		lls.clear();
		expect(lls.getLength()).to.equal(0);
		expect(lls.getItem('hi.there.bob')).to.eql(null);
		expect(lls.key(0)).to.equal(null);
		expect(lls.key(1)).to.equal(null);
	});
	it('can do key searches',function() {
		var lls = getInstance();
		lls.setItem('hi.there.james',{hi:{there:"james"}});
		lls.setItem('hi.there.bob',{hi:{there:"bob"}});
		lls.setItem('hi.there',1);
		lls.setItem('hi.today',1);
		lls.setItem('bye.today',1);
		lls.setItem('bye.today.james',1);
		expect(lls.findKeys('hi.there.*')).to.eql(['hi.there.bob','hi.there.james']);
		expect(lls.findKeys('hi.*')).to.eql(['hi.there','hi.today']);
		expect(lls.findKeys('*.*.james')).to.eql(['bye.today.james','hi.there.james']);
		expect(lls.findKeys('*')).to.eql([]);
		expect(lls.findKeys('*.*')).to.eql(['bye.today','hi.there','hi.today']);
	});
});

})();

}));
