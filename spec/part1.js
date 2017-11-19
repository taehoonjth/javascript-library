(function() {
  'use strict';

  describe('파트 1', function() {

    describe('identity', function() {
      checkForNativeMethods(function() {
        _.identity(1);
      });

      it('인자(argument)를 그대로 반환해야 합니다', function() {
        var uniqueObject = {};
        expect(_.identity(1)).to.equal(1);
        expect(_.identity('string')).to.equal('string');
        expect(_.identity(false)).to.be.false;
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe('first', function() {
      checkForNativeMethods(function() {
        _.first([1,2,3]);
      });

      it('배열에서 첫번째 원소를 반환해야 합니다', function() {
        expect(_.first([1,2,3])).to.equal(1);
      });

      it('인덱스 인자(argument)를 받아야 합니다', function() {
        expect(_.first([1,2,3], 2)).to.eql([1, 2]);
      });

      it('인덱스로 0이 들어오면 빈 배열을 반환해야 합니다', function() {
        expect(_.first([1,2,3], 0)).to.eql([]);
      });

      it('인덱스가 배열의 전체 길이보다 크다면 배열 전체를 반환해야 합니다', function() {
        expect(_.first([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('last', function() {
      checkForNativeMethods(function() {
        _.last([1,2,3]);
      });

      it('배열의 마지막 원소를 반화해야합니다', function() {
        expect(_.last([1,2,3])).to.equal(3);
      });

      it('인덱스 인자가 제공될 때 제대로 작동해야 합니다', function() {
        expect(_.last([1,2,3], 2)).to.eql([2, 3]);
      });

      it('인덱스로 0이 들어오면 빈 배열을 반환해야 합니다', function() {
        expect(_.last([1,2,3], 0)).to.eql([]);
      });

      it('인덱스가 배열의 전체 길이보다 크다면 배열 전체를 반환해야 합니다', function() {
        expect(_.last([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('each', function() {
      checkForNativeMethods(function() {
        _.each([1,2,3,4], function(number) {});
      });

      it('함수여야합니다.', function() {
        expect(_.each).to.be.an.instanceOf(Function);
      });

      it('아무것도 반환하지 않아야 합니다', function() {
        var returnValue = _.each([], function(){});
        expect(returnValue).to.not.exist;
      });

      it('인자로 제공된 배열을 변형하면 안됩니다', function() {
        var input = [1,2,3,4,5];
        var result = _.each(input, function(item) { /* noop */ });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of each,
         * we would assume that `lastElement` is 5. But if inside of
         * each, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of each to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in each.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1,2,3,4,5])
      });

      it('배열의 모든 원소들을 두번째 인자로 전달된 함수에게 제공해야 합니다', function() {
        var letters = ['a', 'b', 'c'];
        var iterations = [];

        _.each(letters, function(letter) {
          iterations.push(letter);
        });

        expect(iterations).to.eql(['a','b','c']);
      });

      it('배열의 모든 원소들을 두번째 인자로 전달된 함수에게 제공할 때 인덱스도 함께 제공해야 합니다', function() {
        var letters = ['a', 'b', 'c'];
        var iterations = [];

        _.each(letters, function(letter, index) {
          iterations.push([letter, index]);
        });

        expect(iterations).to.eql([
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ]);
      });

      it('함수에게 배열 또는 오브젝트도 전달해야 합니다', function() {
        var letters = ['a', 'b', 'c'];
        var iterations = [];

        _.each(letters, function(letter, index, collection) {
          iterations.push([letter, index, collection]);
        });

        expect(iterations).to.eql([
          ['a', 0, letters],
          ['b', 1, letters],
          ['c', 2, letters]
        ]);
      });

      it('콜백 함수에게 오브젝트의 각각의 값을 전달해야 합니다', function() {
        var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        var iterations = [];

        _.each(letters, function(value) {
          iterations.push(value);
        });

        expect(iterations).to.eql(['dog', 'elephant', 'flotsam']);
      });

      it('콜백 함수에게 오브젝트의 각각의 키(key)를 전달해야 합니다', function() {
        var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        var iterations = [];

        _.each(letters, function(value, property) {
          iterations.push([value, property]);
        });

        expect(iterations).to.eql([
          ['dog', 'd'],
          ['elephant', 'e'],
          ['flotsam', 'f']
        ]);
      });

      it('콜백 함수에게 오브젝트 자체도 전달해야 합니다', function() {
        var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        var iterations = [];

        _.each(letters, function(value, property, object) {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          ['dog', 'd', letters],
          ['elephant', 'e', letters],
          ['flotsam', 'f', letters]
        ]);
      });
    });

    describe('indexOf', function() {
      checkForNativeMethods(function() {
        _.indexOf([10, 20, 30, 40], 40)
      });

      it('배열에서 40의 인덱스를 찾아야 합니다', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 40)).to.equal(3);
      });

      it('배열에서 대상을 찾을 수 없을 때는 -1을 반환해야 합니다', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 35)).to.equal(-1);
      });

      it('배열에 대상이 여러개 있을 경우 첫 번째 대상의 위치를 반환해야 합니다', function() {
        var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

        expect(_.indexOf(numbers, 40)).to.equal(1);
      });
    });

    describe('filter', function() {
      checkForNativeMethods(function() {
        var isEven = function(num) { return num % 2 === 0; };
        _.filter([1, 2, 3, 4], isEven)
      });

      it('배열의 모든 짝수를 반환해야 합니다', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('배열의 모든 홀수를 반환해야 합니다', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('제공된 배열을 수정하지 않고 새로운 배열로 반환해야 합니다', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('reject', function() {
      checkForNativeMethods(function() {
        var isEven = function(num) { return num % 2 === 0; };
        _.reject([1, 2, 3, 4, 5, 6], isEven)
      });

      it('모든 짝수를 제거해야 합니다', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('모든 홀수를 제거해야 합니다', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('제공된 배열을 수정하지 않고 새로운 배열로 반환해야 합니다', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('uniq', function() {
      checkForNativeMethods(function() {
        _.uniq([1, 2, 3, 4])
      });

      it('입력된 배열을 수정하면 안됩니다', function() {
        var input = [1,2,3,4,5];
        var result = _.uniq(input);

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of _.uniq,
         * we would assume that `lastElement` is 5. But if inside of
         * _.uniq, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of _.uniq to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in _.uniq.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1,2,3,4,5])
      });

      it('정렬되지 않은 배열에서 유일한 원소들만 반환해야 합니다', function() {
        var numbers = [1, 2, 1, 3, 1, 4];

        expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
      });

      it('제공된 배열을 수정하지 않고 새로운 배열로 반환해야 합니다', function() {
        var numbers = [1, 2, 1, 3, 1, 4];
        var uniqueNumbers = _.uniq(numbers);

        expect(uniqueNumbers).to.not.equal(numbers);
      });
    });

    describe('map', function() {
      checkForNativeMethods(function() {
        _.map([1, 2, 3, 4], function(num) {
          return num * 2;
        })
      });

      it('제공된 배열을 수정하면 안됩니다', function() {
        var input = [1,2,3,4,5];
        var result = _.map(input, function(num) { /* noop */ });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of map,
         * we would assume that `lastElement` is 5. But if inside of
         * map, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of map to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in map.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1,2,3,4,5])
      });

      it('콜백 함수에게 배열의 모든 원소를 제공해야 합니다', function() {
        var doubledNumbers = _.map([1, 2, 3], function(num) {
          return num * 2;
        });

        expect(doubledNumbers).to.eql([2, 4, 6]);
      });

      it('제공된 배열을 수정하지 않고 새로운 배열로 반환해야 합니다', function() {
        var numbers = [1, 2, 3];
        var mappedNumbers = _.map(numbers, function(num) {
          return num;
        });

        expect(mappedNumbers).to.not.equal(numbers);
      });
    });

    describe('pluck', function() {
      checkForNativeMethods(function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        _.pluck(people, 'name');
      });

      it('제공된 키(key)에 해당하는 값만 반환해야 합니다', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
      });

      it('제공된 배열을 수정하면 안됩니다', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        _.pluck(people, 'name');

        expect(people).to.eql([{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }]);
      });
    });

    describe('reduce', function() {
      checkForNativeMethods(function() {
        var add = function(tally, item) {return tally + item; };
        _.reduce([1, 2, 3, 4], add)
      });

      it('함수여야 합니다', function() {
        expect(_.reduce).to.be.an.instanceOf(Function);
      });

      it('최소한 무언가라도 반환해야합니다', function() {
        var result = _.reduce([3,2,1], function(memo, item) {return item;});
        expect(result).to.be.defined;
      });

      it('제공된 배열을 수정하면 안됩니다', function() {
        var input = [1,2,3,4,5];
        var result = _.reduce(input, function(memo, item) {return item;});
        
        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of _.reduce,
         * we would assume that `lastElement` is 5. But if inside of
         * _.reduce, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of _.reduce to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in _.reduce.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1,2,3,4,5])
      });

      it('콜백 함수가 인자들을 순서대로 실행해야 합니다', function() {
        var memoInCallback, itemInCallback;

        _.reduce(['item'], function(memo, item) {
          memoInCallback = memo;
          itemInCallback = item;
        }, 'memo');

        expect(memoInCallback).to.equal('memo');
        expect(itemInCallback).to.equal('item');
      });

      it('배열의 원소들을 콜백 함수에게 전달할 때 왼쪽에서 오른쪽 순서대로 전달해야 합니다', function() {
        var orderTraversed = [];

        _.reduce([1,2,3,4], function(memo, item) {
          orderTraversed.push(item);
          return memo;
        }, 10);

        expect(orderTraversed).to.eql([1,2,3,4]);
      });

      it('콜백 함수가 undefined를 반환하더라도 콜백 함수는 계속 호출돼야 합니다', function() {
        var callCount = 0;
        var returnFalsy = function(total, item) {
          callCount++;
          if (callCount === 1) {
            return undefined;
          } else {
            return item + 1;
          }
        };

        var total = _.reduce([1,1,2], returnFalsy);
        expect(total).to.equal(3);
      });

      it('memo가 전달됐을때 모든 원소들이 콜백 함수에게 전달돼야 합니다', function() {
        var result = _.reduce([1,2,3], function(memo, item) {
          return memo - item;
        }, 10);

        expect(result).to.equal(4);
      });

      it('memo의 값으로 falsy 값도 입력 받을 수 있어야 합니다', function() {
        // Be careful how you check if a memo has been passed in
        var result = _.reduce([1,2,3], function(memo, item) {
          return memo * item;
        }, 0);

        expect(result).to.equal(0);
      });

      it('memo가 전달되지 않으면 배열의 첫번째 원소가 memo의 값이 돼야 합니다', function() {
        var result = _.reduce([1,2,3], function(memo) {
          return memo;
        });

        expect(result).to.equal(1);
      });


      it('memo가 전달되지 않으면 콜백 함수에게 전달되는 첫번째 원소는 배열의 두번째 원소여야 합니다', function() {
        var result = _.reduce([3,2,1], function(memo, item) {
          return memo - item;
        });

        expect(result).to.equal(0);
      });

    });
  });

  function checkForNativeMethods(runUnderbarFunction) {
    it('네이티브 메서드를 사용하면 안됩니다', function() {
      // These spies are set up in testSupport.js
      runUnderbarFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
    });
  }
}());
