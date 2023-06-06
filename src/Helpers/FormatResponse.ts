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

const FormatResponse = (AllData: AXIOSRESPONSE) => {
  const data: APIRESPONSE = AllData.data;

  const ResponseLayout = {
    error: !data.success,
    message: data.message,
    errors: data.errors,
    data: data.data,
    metadata: data.metadata,
  };

  return ResponseLayout;
};

export default FormatResponse;
