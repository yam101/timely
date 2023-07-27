import java.io.*;
import java.util.*;

public class Upload{
    public static void main(String[] args) {
        try {
            // Getting the file details from parameters
            String fileName = args[0];
            int id = Integer.parseInt(args[1]) + 1;
            String location = "";

            // Formatting location string
            for (int i=2; i<args.length; i++) {
                location = location + " " + args[i];
            }

            File file = new File("upload/"+fileName);
            // Creating a new file to write data
            File updatedFile = new File("upload/newfile.ics");

            Scanner reader = new Scanner(file);
            FileWriter myWriter = new FileWriter(updatedFile);

            // Iterate through each line in the file and write it with the specified location to the new file
            while(reader.hasNextLine()) {
                String data = reader.nextLine();

                if (data.equals("LOCATION:")) {
                    myWriter.write(data + location.substring(1) + "\n");
                }
                else if(data.startsWith("UID:")) {
                    myWriter.write("UID:" + id + "\n");
                    id++;
                }
                else {
                    myWriter.write(data + "\n");
                }
            }
            reader.close();
            myWriter.close();
        }
        // Error handling
        catch (Exception e) {
            System.err.println("File doesn't exist");
            System.out.println(e);
        }
    }
}