"use client";
import { H3, H4 } from "components/Typography";
import { Exo_2 } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductSpecifications(props) {
  const specifications=props.names;
  return (
    <div>
      <H3 mb={2}>SPECIFICATIONS</H3>
      <div className="container-fluid mt-2">
        { specifications.map((name) => (
          <div className="row" key={name}>
            <div className="col-md-6">
                  <h6>{name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
