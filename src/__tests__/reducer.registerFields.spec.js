import actions from '../actions'
const { registerFields } = actions

const describeRegisterFields = (reducer, expect, { fromJS }) => () => {
  it('should create registeredFields if it does not exist and a field', () => {
    const state = reducer(
      fromJS({
        foo: {}
      }),
      registerFields('foo', [
        { name: 'bar', type: 'Field' },
        { name: 'baz', type: 'Field' }
      ])
    )
    expect(state).toEqualMap({
      foo: {
        registeredFields: {
          bar: { name: 'bar', type: 'Field', count: 1 },
          baz: { name: 'baz', type: 'Field', count: 1 }
        }
      }
    })
  })

  it('should add a field to registeredFields', () => {
    const state = reducer(
      fromJS({
        foo: {
          registeredFields: {
            baz: { name: 'baz', type: 'FieldArray', count: 1 }
          }
        }
      }),
      registerFields('foo', [{ name: 'bar', type: 'Field' }])
    )
    expect(state).toEqualMap({
      foo: {
        registeredFields: {
          baz: { name: 'baz', type: 'FieldArray', count: 1 },
          bar: { name: 'bar', type: 'Field', count: 1 }
        }
      }
    })
  })

  it('should increase count if the field already exists', () => {
    const initialState = fromJS({
      foo: {
        registeredFields: { bar: { name: 'bar', type: 'Field', count: 1 } }
      }
    })
    const state = reducer(
      initialState,
      registerFields('foo', [{ name: 'bar', type: 'Field' }])
    )
    expect(state).toEqualMap({
      foo: {
        registeredFields: {
          bar: { name: 'bar', type: 'Field', count: 2 }
        }
      }
    })
  })
}

export default describeRegisterFields
