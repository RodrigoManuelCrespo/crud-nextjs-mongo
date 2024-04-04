'use client'

import React from "react";
import { Card } from "@nextui-org/react";

interface Props {
    content: JSX.Element;
}

export default function HeaderComponent({ content }: Props) {
    return (
        <Card className="rounded-t-none rounded-b-3xl p-6 mb-6">
            {content}
        </Card>
    );
}
