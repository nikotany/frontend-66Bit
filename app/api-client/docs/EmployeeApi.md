# EmployeeApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiEmployeeGet**](#apiemployeeget) | **GET** /api/Employee | |
|[**apiEmployeeIdGet**](#apiemployeeidget) | **GET** /api/Employee/{id} | |

# **apiEmployeeGet**
> Array<Employee> apiEmployeeGet()


### Example

```typescript
import {
    EmployeeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EmployeeApi(configuration);

let page: number; // (optional) (default to undefined)
let count: number; // (optional) (default to undefined)
let name: string; // (optional) (default to undefined)
let gender: Array<Gender>; // (optional) (default to undefined)
let position: Array<Position>; // (optional) (default to undefined)
let stack: Array<Technology>; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmployeeGet(
    page,
    count,
    name,
    gender,
    position,
    stack
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **count** | [**number**] |  | (optional) defaults to undefined|
| **name** | [**string**] |  | (optional) defaults to undefined|
| **gender** | **Array&lt;Gender&gt;** |  | (optional) defaults to undefined|
| **position** | **Array&lt;Position&gt;** |  | (optional) defaults to undefined|
| **stack** | **Array&lt;Technology&gt;** |  | (optional) defaults to undefined|


### Return type

**Array<Employee>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmployeeIdGet**
> Employee apiEmployeeIdGet()


### Example

```typescript
import {
    EmployeeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EmployeeApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiEmployeeIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Employee**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

