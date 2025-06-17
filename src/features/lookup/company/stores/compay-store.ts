import {defineLookupStore} from "src/features/lookup/base/store/lookup-store";
import {Company} from "src/features/lookup/company/stores/types";


export const useCompanyStore = defineLookupStore<Company, Company>('companies')
