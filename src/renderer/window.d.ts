import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';

declare global {
  interface Window {
    client: ServiceClient;
  }
}
