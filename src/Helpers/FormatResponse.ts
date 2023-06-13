interface AXIOSRESPONSE {
  data: APIRESPONSE;
}

type APIRESPONSE = {
  success: boolean;
  message: string;
  data: [{}];
  errors: [
    {
      field: string;
      description: string;
    }
  ];
  metadata: {};
};

export interface RESPONSELAYOUT {
  error: boolean;
  message: string;
  errors: Array<{field:string,description:string}> | undefined;
  data: any;
  metadata: any;
}

const FormatResponse = (AllData: AXIOSRESPONSE) => {
  const data: APIRESPONSE = AllData.data ?? {
    success: false,
    message: "Serveur Error",
    data: [],
    errors: [],
    metadata: {},
  };

  const ResponseLayout: RESPONSELAYOUT = {
    error: !data.success,
    message: data.message,
    errors: data.errors,
    data: data?.data,
    metadata: data.metadata,
  };

  return ResponseLayout;
};

export default FormatResponse;
