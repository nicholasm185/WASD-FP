import { ExecFileSyncOptionsWithStringEncoding } from 'child_process';
import { Tracing } from 'trace_events';

export interface User {
    name: string;
    email: string;
    verified_at: string;
    id: string;
    banned: string;
  }
