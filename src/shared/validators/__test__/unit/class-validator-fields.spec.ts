
import * as libClassValidator from "class-validator";
import { ClassValidatorFields } from "../../class-validator-fields";

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {}

class StubRules {
  @libClassValidator.IsString()
  @libClassValidator.IsNotEmpty()
  field: string;

  constructor(field: string) {
    this.field = field;
  }
}

describe('ClassValidatorFields unit tests', () => {
  let sut: StubClassValidatorFields;

  beforeEach(() => {
    sut = new StubClassValidatorFields();
  });

  it('Should start with undefined errors and validatedData', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')

    spyValidateSync.mockReturnValue([
     { property: 'field', constraints: {isRequired: 'test error'}}
    ])

    expect(sut.errors).toBeUndefined();
    expect(sut.validatedData).toBeUndefined();
    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.errors).toStrictEqual({field: ['test error']})
  });

  it('Should validate with errors', () => {
    const invalidData = new StubRules('');
    const isValid = sut.validate(invalidData);

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
    expect(sut.validatedData).toBeUndefined();
  });

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([ ])
    const sut = new StubClassValidatorFields()

    const validData = new StubRules('valid_value');
    const isValid = sut.validate(validData);

    expect(isValid).toBeTruthy();
    expect(sut.validatedData).toEqual(validData);
    expect(sut.errors).toBeUndefined();

    expect(sut.validate({field: 'value'})).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({field: 'value'})
    expect(sut.errors).toBeUndefined()
  });
});
