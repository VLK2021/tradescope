type SetupCardNoteProps = {
    note: string | null;
};

const SetupCardNote = ({
                           note,
                       }: SetupCardNoteProps) => {
    if (!note) {
        return null;
    }

    return (
        <section
            className="
                border-t
                border-[var(--color-border)]
                px-4
                py-4
            "
        >
            <h3
                className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[var(--color-text-secondary)]
                "
            >
                Нотатка
            </h3>

            <p
                className="
                    mt-2
                    line-clamp-3
                    whitespace-pre-wrap
                    break-words
                    text-sm
                    leading-5
                    text-[var(--color-text-secondary)]
                "
                title={note}
            >
                {note}
            </p>
        </section>
    );
};

export {SetupCardNote};