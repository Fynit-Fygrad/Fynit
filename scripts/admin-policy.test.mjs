import test from 'node:test';
import assert from 'node:assert/strict';
import { validAccountSession, accountActionError } from '../src/lib/admin-policy.ts';
const admin = { id: 'admin', role: 'ADMIN', isActive: true, sessionVersion: 0 };
const user = { id: 'user', role: 'USER', isActive: true, sessionVersion: 0 };
test('sessions require an existing active account and matching version', () => {
  assert.equal(validAccountSession(user, {userId:'user'}), true);
  assert.equal(validAccountSession(null, {userId:'user'}), false);
  assert.equal(validAccountSession(user, null), false);
  assert.equal(validAccountSession(user, {userId:'other'}), false);
  assert.equal(validAccountSession({...user,isActive:false}, {userId:'user'}), false);
  assert.equal(validAccountSession({...user,sessionVersion:1}, {userId:'user'}), false);
  assert.equal(validAccountSession({...user,sessionVersion:1}, {userId:'user',sessionVersion:1}), true);
});
test('administrative changes reject ordinary, inactive and missing actors', () => {
  for (const actor of [null, user, {...admin,isActive:false}]) assert.ok(accountActionError(actor,user,'DEACTIVATE'));
});
test('administrators cannot change themselves or another administrator', () => {
  for (const action of ['DEACTIVATE','ACTIVATE','REVOKE_SESSIONS']) {
    assert.ok(accountActionError(admin,admin,action));
    assert.ok(accountActionError(admin,{...admin,id:'other'},action));
  }
});
test('valid transitions and missing/stale targets', () => {
  assert.equal(accountActionError(admin,user,'DEACTIVATE'),null);
  assert.equal(accountActionError(admin,{...user,isActive:false},'ACTIVATE'),null);
  assert.equal(accountActionError(admin,user,'REVOKE_SESSIONS'),null);
  assert.ok(accountActionError(admin,user,'ACTIVATE'));
  assert.ok(accountActionError(admin,{...user,isActive:false},'DEACTIVATE'));
  assert.ok(accountActionError(admin,null,'DEACTIVATE'));
});
