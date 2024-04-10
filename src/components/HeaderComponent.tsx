'use client'

import React from "react";
import { Card } from "@nextui-org/react";

interface Props {
    content: JSX.Element;
}

export default function HeaderComponent({ content }: Props) {
    return (
        <Card className="rounded-t-none px-6 py-8 mb-6">
            {content}
        </Card>
    );
}
