# 全局设定

afterAll(fn, timeout)
afterEach(fn, timeout)
beforeAll(fn, timeout)
beforeEach(fn, timeout)
describe(name, fn)
describe.each(table)(name, fn, timeout)

1. describe.each(table)(name, fn, timeout)
2. describe.each`table`(name, fn, timeout)
   describe.only(name, fn)
   describe.only.each(table)(name, fn)
   describe.only.each(table)(name, fn)
   describe.only.each`table`(name, fn)
   describe.skip(name, fn)
   describe.skip.each(table)(name, fn)
   describe.skip.each(table)(name, fn)
   describe.skip.each`table`(name, fn)
   test(name, fn, timeout)
   test.concurrent(name, fn, timeout)
   test.concurrent.each(table)(name, fn, timeout)
3. test.concurrent.each(table)(name, fn, timeout)
4. test.concurrent.each`table`(name, fn, timeout)
   test.concurrent.only.each(table)(name, fn)
   test.concurrent.only.each(table)(name, fn)
   test.only.each`table`(name, fn)
   test.concurrent.skip.each(table)(name, fn)
   test.concurrent.skip.each(table)(name, fn)
   test.concurrent.skip.each`table`(name, fn)
   test.each(table)(name, fn, timeout)
5. test.each(table)(name, fn, timeout)
6. test.each`table`(name, fn, timeout)
   test.failing(name, fn, timeout)
   test.failing.each(name, fn, timeout)
   test.only.failing(name, fn, timeout)
   test.skip.failing(name, fn, timeout)
7. test.only(name, fn, timeout)
   test.only.each(table)(name, fn)
   test.only.each(table)(name, fn)
   test.only.each`table`(name, fn)
   test.skip(name, fn)
   test.skip.each(table)(name, fn)
   test.skip.each(table)(name, fn)
   test.skip.each`table`(name, fn)
   test.todo(name)
