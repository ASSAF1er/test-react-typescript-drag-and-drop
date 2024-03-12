type MessageProps = {
  name: string;
  children: string;
};
function Message({ name, children }: MessageProps) {
  return (
    <p>
      {name}:{children}
    </p>
  );
}

export default Message;
