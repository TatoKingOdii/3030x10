import {FormControl, FormGroup} from "@angular/forms";

// export type TypedForm<T> =
//   T extends any[] ? FormArray<TypedForm<Element>>
//     : T extends string ? FormControl<T>
//       : T extends number ? FormControl<T>
//         : T extends bigint ? FormControl<T>
//           : T extends boolean ? FormControl<T>
//             : T extends Date  ? FormControl<T>
//               : T extends object ?
//                 FormGroup<{
//                   [K in keyof T]: TypedForm<T[K]>;
//                 }>
//                 : never;

export type TypedForm<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
