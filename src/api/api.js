import axios from "axios";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNjN2UzZWFiNDJhMTM0MGQyYzk1NGFhNGU5Yzk3OTA2ZDllMzdjZTZiZTQ4MDE0YjM2NTNmZWZkZjZiNjAxYTY1NGU2NjEyZGNlN2U0M2I5In0.eyJhdWQiOiIxOTNhNjE2ZC0zMjUwLTRmNjctYThjMy0zMmYwNTkxMDM3NTQiLCJqdGkiOiIzYzdlM2VhYjQyYTEzNDBkMmM5NTRhYTRlOWM5NzkwNmQ5ZTM3Y2U2YmU0ODAxNGIzNjUzZmVmZGY2YjYwMWE2NTRlNjYxMmRjZTdlNDNiOSIsImlhdCI6MTcyNjIzNzQ2NSwibmJmIjoxNzI2MjM3NDY1LCJleHAiOjE3MjkyMDk2MDAsInN1YiI6IjExNTE3ODk0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTUwMTg2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOGI0ZjMwMmEtOTljNS00MGNmLTk4YjgtMTQyY2VkZjA2YWVhIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.i6t-6YFCWSR-yCMIdehOOmBUxdZOXhBwUJ5KxjGWNoSDfQLJseTw6gkNPNQgvqmsPFFwkUYmwhXeprHqOxNMwG7zQqpgWHwd2Mm2fahmJ0rcEVCfj7X7nM8q64pO35rkenqCP34yOKwSes_am_2zrltVIRX_GKukZmkU6tOBHugvt6kiuyhLSC2ZqUFDdvOOIH3Z9ecu8ejBiK3AUks3XNdVLhaDzEbfvg5Z29sgv0WHtuooG-oGdEa3PoZqlylEW2JrG6JCGL3dTsVIGBzSqGU7vBDn2ILar7jEI5n8Iz4uAy1QNa9r8ZF5JVirk8XVdlUgSpO6DoDZyimW_Uy8rw";

export const getData = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res) {
      return res;
    }
    if (res.status === 204) {
      return [];
    }
  } catch (error) {
    return { error: "Server error" };
  }
};
