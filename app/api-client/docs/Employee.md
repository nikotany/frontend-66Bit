# Employee


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**photo** | **string** |  | [default to undefined]
**phone** | **string** |  | [default to undefined]
**gender** | **string** | Localized gender label (e.g. \&quot;Мужчина\&quot;, \&quot;Женщина\&quot;) | [default to undefined]
**position** | **string** | Localized position label (e.g. \&quot;Frontend-разработчик\&quot;) | [default to undefined]
**stack** | **Array&lt;string&gt;** |  | [default to undefined]
**birthdate** | **string** | Localized date string | [default to undefined]
**dateOfEmployment** | **string** | Localized date string | [default to undefined]

## Example

```typescript
import { Employee } from './api';

const instance: Employee = {
    id,
    name,
    photo,
    phone,
    gender,
    position,
    stack,
    birthdate,
    dateOfEmployment,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
