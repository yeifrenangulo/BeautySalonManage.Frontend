export interface ResponseServer {
  pageNumber: number;
  pageSize:   number;
  pageTotal:  number;
  succeded:   boolean;
  message:    null;
  errors:     null;
  data:       any[];
}