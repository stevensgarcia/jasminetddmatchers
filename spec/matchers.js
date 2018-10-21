describe('Matchers Jasmine Playground', () => {

  describe('Basic Matchers', () => {
    it('toBe: ===', () => {
      expect(5).toBe(5, 'hey it is not 5!');
      expect('5').not.toBe(5, '=== string vs int!');
      expect({testing: 'is', awesome: 'yo!'}).not.toBe({testing: 'is', awesome: 'yo!'}, 'object');
    });

    it('toEqual: === + object inspection', () => {
      expect(5).toEqual(5);
      expect('5').not.toEqual(5);
      expect({testing: 'is', awesome: 'yo!'}).toEqual({testing: 'is', awesome: 'yo!'}, 'object');
      expect([1,2,3]).toEqual([1,2,3]);
      expect([1,2,3]).not.toEqual([1]);
    });

    it('toMatch - regex for strings', () => {
      expect("mary had a little lamb").toMatch('lamb');
      expect("mary had a little lamb").toMatch(/HAD A/i);
      expect("mary had a little lamb").not.toMatch(/billy/);
    });

    it('toBeNull', () => {
      const nu = null;
      expect(nu).toBeNull();
    });

    it('toBeFalsy', () => {
      expect('').toBeFalsy();
      expect(0).toBeFalsy();
      expect(null).toBeFalsy();
      expect(NaN).toBeFalsy();
      expect(undefined).toBeFalsy();
      expect([]).not.toBeFalsy();
      expect({}).not.toBeFalsy();
      expect([0]).not.toBeFalsy();
    });

    it('toBeDefined()', () => {
      let name = 'Stevens';
      expect(name).toBeDefined();
    });

    it('toBeUndefined()', () => {
      let name;
      expect(name).toBeUndefined();
    });

    it('toContain()', () => {
      expect([1,2,3]).toContain(2);
      expect([1,2,3, 'hola', {name: 'stevens'}]).toContain(2, 'hola', {name: 'stevens'});
      expect([1,2,3]).not.toContain('3');
    });

    it('toBeGreaterThan()', () => {
      expect(3).toBeGreaterThan(2);
      expect(3).not.toBeGreaterThan(4);
    });

    it('toBeLessThan()', () => {
      expect(3).toBeLessThan(4);
      expect(3).not.toBeLessThan(2);
    });

    it('toBeCloseTo()', () => {
      expect(5.768).toBeCloseTo(5.768, 2);
      expect(5.768).toBeCloseTo(5.768, 1);
      expect(5.762).toBeCloseTo(5.762, 1);
      expect(5.762).toBeCloseTo(5.762, 2);
      expect(2.78).toBeCloseTo(3, 0);
      expect(3).toBeCloseTo(2.78, 0);
    });

  });

  describe('Error matchers', () => {
    // matcher is for testing if a function throws an exception
    it('toThrow()', () => {
      const some = () => {
        throw 'Im an error';
      };
      const other = () => {
        throw new Error('Im an error');
      };

      expect(some).toThrow();
      expect(some).toThrow('Im an error');
      expect(other).toThrow();
      expect(other).toThrow(new Error('Im an error'));
    });

    // matcher is for testing a specific thrown exception
    it('toThrowError()', () => {
      const some = () => {
        throw new TypeError('Im an a type error');
      };
      const other = () => {
        throw new Error('Im an error');
      };
      console.log(new Error('Im an error'));

      expect(some).toThrowError(/im an a type error/i);
      expect(some).toThrowError(TypeError);
      expect(other).toThrowError(/im an error/i);
      expect(other).toThrowError(Error);
    });

  });

  describe('Jasmine Asymetric Matchers', () => {

    const User = class {};
    const user = new User();

    it('Value type', () => {
      expect(3).toEqual(jasmine.any(Number));
      expect([1, 2, 3]).toContain(jasmine.any(Number));
      expect('Stevens').toEqual(jasmine.any(String));
      expect({}).toEqual(jasmine.any(Object));
      expect([]).toEqual(jasmine.any(Array));
      expect(user).toEqual(jasmine.any(Object));
      expect(user).toEqual(jasmine.any(User));
      expect({name: 'Stevens'}).toEqual({name: jasmine.any(String)});
      expect(4).toEqual(jasmine.anything());

      expect(undefined).toEqual(undefined);
      expect(null).not.toEqual(jasmine.anything());
      expect(undefined).not.toEqual(jasmine.anything());
    });

    it('Object containing', () => {
      const some = {
        name: 'Stevens',
        age: 30,
        talk() {
          return 'Hi';
        }
      };
      expect(some)
        .toEqual(jasmine.objectContaining({
          name: jasmine.anything()
        }));
      expect(some)
        .toEqual(jasmine.objectContaining({
          name: jasmine.any(String)
        }));
      expect(some)
        .toEqual(jasmine.objectContaining({
          age: jasmine.any(Number)
        }));
      expect(some)
        .toEqual(jasmine.objectContaining({
          name: jasmine.anything(),
          age: jasmine.anything()
        }));
    });

    it('Array containing', () => {
      const doSome = function() {};
      const some = [
        'some',
        4,
        { name: 'Stevens'},
        doSome
      ];
      expect(some).toEqual(jasmine.arrayContaining(['some']));
      expect(some).toEqual(jasmine.arrayContaining([
        'some',
        {name: 'Stevens'}
      ]));
      expect(some).toEqual(jasmine.arrayContaining([
        jasmine.anything()
      ]));
      expect(some).toEqual(jasmine.arrayContaining([
        doSome
      ]));
    });

    it('String matching', () => {
      const some = {
        name: 'Stevens',
        last: 'Garcia'
      };
      expect(some).toEqual(
        jasmine.objectContaining({
          name: jasmine.stringMatching(/vens/)
        }));
    });

  });

  describe('Spyes', () => {
    // Define variables
    let spy, result;
    beforeEach(() => {
      // ASSEMBLE
      this.printName = (name) => {
        return `Hi ${name}!`;
      };
      spy = spyOn(this, 'printName').and.callThrough();
      // ACT
      result = this.printName('Stevens');
    });
    afterEach(() => {
      spy.calls.reset();
    });
    it('toHaveBeenCalled()', () => {
      // ASSERT
      expect(spy).toHaveBeenCalled();
    });

    it('toHaveBeenCalledWith()', () => {
      expect(spy).toHaveBeenCalledWith('Stevens');
      expect(spy).toHaveBeenCalledWith(jasmine.any(String));
    });

    it('callThrough()', () => {
      expect(result).toEqual('Hi Stevens!');
    });

    describe('callFake Test', () => {
      // Define variables
      let spy, result;
      beforeEach(() => {
        // ASSEMBLE
        this.printName = (name) => `Hi ${name}!`;
        spy = spyOn(this, 'printName')
          .and
          .callFake((name) => `Hello ${name}`);
        // ACT
        result = this.printName('Stevens');
      });
      afterEach(() => {
        spy.calls.reset();
      });
      it('callFake()', () => {
        expect(result).toEqual(`Hello Stevens`);
      });
    });

  });

  describe('Spyes and throw errors', () => {
    // Define variables
    let spy;
    beforeEach(() => {
      // ASSEMBLE
      this.printName = (name) => {
        return `Hi ${name}!`;
      };
      spy = spyOn(this, 'printName')
        .and
        .throwError('This is an error message');
    });
    afterEach(() => {
      spy.calls.reset();
    });
    it('throwError()', () => {
      expect(spy).toThrowError('This is an error message');
      expect(spy).toThrowError(Error);
      expect(spy).toThrow();
    });
  });

  describe('Stubs (reset)', () => {
    // Define variables
    let spy, result;
    beforeEach(() => {
      // ASSEMBLE
      this.printName = (name) => {
        return `Hi ${name}!`;
      };
      spy = spyOn(this, 'printName')
        .and
        .returnValue('Hi there!')
    });
    afterEach(() => {
      spy.calls.reset();
    });
    it('and.stub()', () => {
      result = this.printName('Stevens');
      expect(result).toEqual('Hi there!');

      // Reset spy inside same spec to an another spy configuration
      spy.and.stub();
      spy.and.returnValue('Goku');

      expect(this.printName('Goku')).toEqual('Goku');

    });
  });

  describe('Spy on multiple calls', () => {
    // Define variables
    let spy, result;
    beforeEach(() => {
      // ASSEMBLE
      this.printName = (name) => {
        return `Hi ${name}!`;
      };
      spy = spyOn(this, 'printName');
      // ACT
      this.printName('Juan');
      this.printName('Jose');
      this.printName('Stevens');
      this.printName('Salo', 'Stevens');
    });
    afterEach(() => {
      spy.calls.reset();
    });
    it('spy.calls.count()', () => {
      // ASSERT
      expect(spy.calls.count()).toEqual(4);
    });
    it('spy.calls.argsFor(i) => []', () => {
      expect(spy.calls.argsFor(3)).toContain('Salo');
      expect(spy.calls.argsFor(3)).toEqual(jasmine.arrayContaining(['Stevens']));
    });

    it('calls.first()', () => {
      console.log(spy.calls.first());
      expect(spy.calls.first())
        .toEqual({
          object: window,
          args: ['Juan'],
          returnValue: undefined,
          invocationOrder: jasmine.any(Number)
        });
    });

    it('calls.mostRecent()', () => {
      expect(spy.calls.mostRecent())
        .toEqual(jasmine.objectContaining({
          args: ['Salo', 'Stevens'],
          returnValue: undefined
        }));
    });

    it('call.any()', () => {
      expect(spy.calls.any()).toBeTruthy();
    });

   });

});
