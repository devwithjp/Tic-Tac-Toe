import "@aws-amplify/ui-react/styles.css";
import {
    withAuthenticator,
    Button,
    Heading,
    View,
    Card,
} from "@aws-amplify/ui-react";

function Auth({signOut}) {
    return (
        <View className="Auth"  style={{paddingBottom:"60px"}}>
        <Card>
          <Heading level={1}>We now have Auth!</Heading>
        </Card>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    );
}

export default withAuthenticator(Auth);


