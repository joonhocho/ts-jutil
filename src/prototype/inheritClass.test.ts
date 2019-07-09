import { inheritClass } from './inheritClass';

describe('inheritClass', () => {
  test('should inherit all static and prototype properties', () => {
    class A {
      public static a1 = 1;

      public static c1 = 1;

      public a2(): number {
        return 1;
      }

      public c2(): number {
        return 1;
      }
    }

    // tslint:disable-next-line
    class B {
      public static b1 = 2;

      public static c1 = 2;

      public b2(): number {
        return 2;
      }

      public c2(): number {
        return 2;
      }
    }

    inheritClass(A, B);

    expect(Object.getOwnPropertyDescriptor(A, 'b1')).toEqual(
      Object.getOwnPropertyDescriptor(B, 'b1')
    );
    expect(Object.getOwnPropertyDescriptor(A.prototype, 'b2')).toEqual(
      Object.getOwnPropertyDescriptor(B.prototype, 'b2')
    );
    expect(Object.getOwnPropertyDescriptor(A, 'c1')).not.toEqual(
      Object.getOwnPropertyDescriptor(B, 'c1')
    );
    expect(Object.getOwnPropertyDescriptor(A.prototype, 'c2')).not.toEqual(
      Object.getOwnPropertyDescriptor(B.prototype, 'c2')
    );
    expect(A.c1).toBe(1);
    expect(A.prototype.c2()).toBe(1);
  });
});
