export interface SigninStateInterface {
  prop: boolean;
}

function state(): SigninStateInterface {
  return {
    prop: false,
  };
}

export default state;
