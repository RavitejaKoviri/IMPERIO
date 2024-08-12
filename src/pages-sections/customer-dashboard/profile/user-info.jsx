import { format } from "date-fns";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery"; // GLOBAL CUSTOM COMPONENTS

import FlexBox from "components/flex-box/flex-box";
import { Small, Span } from "components/Typography"; // CUSTOM DATA MODEL

// ==============================================================
export default function UserInfo({ user }) {
  // console.log("a",user.userProfile[0].firstname);
  // const val = user.userProfile[0];
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Card
      sx={{
        mt: 3,
        display: "flex",
        flexWrap: "wrap",
        p: "0.75rem 1.5rem",
        alignItems: "center",
        justifyContent: "space-between",
        ...(downMd && {
          alignItems: "start",
          flexDirection: "column",
          justifyContent: "flex-start",
        }),
      }}
    >
      {/* <TableRowItem title="First Name" value={val.firstname} />
      <TableRowItem title="Last Name" value={val.lastname} />
      <TableRowItem title="Email" value={val.email} />
      <TableRowItem title="Phone" value={val.phonenumber} /> */}
      {/* <TableRowItem
        title="Birth date"
        value={format(new Date(user.dateOfBirth), "dd MMM, yyyy")}
      /> */}
    </Card>
  );
}

function TableRowItem({ title, value }) {
  console.log(value);
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5}>
        {title}
      </Small>

      <Span>{value}</Span>
    </FlexBox>
  );
}
