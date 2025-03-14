import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Chip,
} from "@heroui/react";
import moment from "moment/moment";
import PropTypes from 'prop-types';

export default function CantactCard({ cardDetails }) {
  return (
    <Card className="py-4 h-[400px] w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{cardDetails.email}</p>
        <small className="text-default-500">
          {moment(cardDetails.createdAt).format("MMM Do YY")}
        </small>
        <h4 className="font-bold text-large">{cardDetails.userName}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
        <Image
          alt="Card background"
          className="w-full object-cover rounded-xl"
          src={`${cardDetails.profilePhoto}`}
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Chip
          variant="shadow"
          classNames={{
            base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
            content: "drop-shadow shadow-black text-white",
          }}
        >
          {cardDetails.isAdmin ? "Admin" : "User"}
        </Chip>
      </CardFooter>
    </Card>
  );
}

CantactCard.propTypes = {
  cardDetails: PropTypes.shape({
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired
  }).isRequired
};
